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

export function register(username, password, email, phone, code) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/auth/register`,
			method: 'POST',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: {
				username,
				password,
				email,
				phone,
				code,
			},
			timeout: 10000,
			success: res => {
				console.log('注册响应:', res);
				// 根据实际接口结构调整判断逻辑
				if (res.data.status === 200) {
					resolve(res.data);
				} else {
					const errMsg = res.data?.message || '注册失败，请重试';
					reject(new Error(errMsg));
				}
			},
		});
	});
}

export function sendValidationCode(email) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/auth/valid-register-email`,
			method: 'POST',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				email: email
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
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

export function startreset(email, code) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/auth/start-reset`,
			method: 'POST',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				email,
				code
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
					uni.showToast({
						title: res.data.message,
						icon: 'success'
					});
					resolve(res.data);
				} else {
					uni.showToast({
						title: res.data.message || '请先发送验证码',
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

export function doreset(password) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/auth/do-reset`,
			method: 'POST',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				password
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
					uni.showToast({
						title: res.data.message,
						icon: 'success'
					});
					resolve(res.data);
				} else {
					uni.showToast({
						title: res.data.message || '失败',
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

export function sendresetcode(email) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/auth/valid-reset-email`,
			method: 'POST',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				email: email
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
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

export function getUserInfo() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/user/me`,
			method: 'GET',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				token: uni.getStorageSync('token')
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					uni.showToast({
						title: res.data.message || '获取用户信息失败',
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

export function LogoutAc(id) {
	const numberId = Number(id)
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/auth/delete/${numberId}`,
			method: 'DELETE',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: {
				id,
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					uni.showToast({
						title: res.data.message || '注销失败',
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

export function updatepwd(id,oldPassword,newPassword) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}/api/auth/updatepwd`,
			method: 'POST',
			withCredentials: true,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: {
				id,
				oldPassword,
				newPassword
			},
			success: (res) => {
				console.log(res)
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					uni.showToast({
						title: res.data.message || '修改密码失败',
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