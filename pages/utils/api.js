const BASE_URL = 'http://localhost:8080'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}/api/auth/login`,
      method: 'POST',
      data: {
        username,
        password
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
	    withCredentials: true,	
      success: res => {
        if (res.statusCode === 200 && res.data.success) {
          const token = res.data.token
          if (token) {
            uni.setStorageSync('token', token)
          }
          resolve(res.data)
        } else {
          reject(new Error(res.data.message || '登录失败'))
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}


export function logout() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}/api/auth/logout`,
      method: 'POST',
      withCredentials: true,
      success: res => {
        if (res.statusCode === 200 && res.data.success) {
          uni.removeStorageSync('token') // 清除 token
          // 如果有用户信息缓存，也可以一并清除
          // uni.removeStorageSync('userInfo')

          uni.reLaunch({
            url: '/' 
          })

          resolve(res.data)
        } else {
          reject(new Error(res.data.message || '退出登录失败'))
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function register(username, password,email,code) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}/api/auth/register`,
      method: 'POST',
      data: {
        email,
        password,
        email,
        code,
		username,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
		  console.log(res)
        if (res.statusCode === 200 && res.data.success) {
          resolve(res.data)
        } else {
          reject(new Error(res.data.message || '注册失败'))
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function sendValidationCode(email) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}/api/auth/valid-register-email`,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        email: email
      },
      success: (res) => {
        if (res.data.code === 200) {
          uni.showToast({
            title: res.data.message,
            icon: 'success'
          });
          resolve(res.data);
        } else {
          uni.showToast({
            title: res.data.message || '发送失败',
            icon: 'none'
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
}
