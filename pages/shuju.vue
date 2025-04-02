<template>
	<view>
		<view>
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" style="height:300px;" />
		</view>

		<view>
			<qiun-data-charts type="column" :opts="optsColumn" :chartData="chartDatacolumn"
				style="height: 300px;margin-top: 100px;" />
		</view>
	</view>
</template>

<script>
import Nav from '@/components/Nav.vue'; // 引入你的 Nav 组件
export default {
	data() {
		return {
			value6: '3',
			chartData: {},
			chartDatacolumn: {},
			opts: {
				color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
					"#ea7ccc"
				],
				padding: [15, 10, 0, 15],
				enableScroll: false,
				legend: {},
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					gridType: "dash",
					dashLength: 2
				},
				extra: {
					line: {
						type: "straight",
						width: 2,
						activeType: "hollow"
					}
				}
			},
			optsColumn: {
				color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
					"#ea7ccc"
				],
				padding: [15, 15, 0, 5],
				enableScroll: false,
				legend: {},
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					data: [{
						min: 0
					}]
				},
				extra: {
					column: {
						type: "group",
						width: 30,
						activeBgColor: "#000000",
						activeBgOpacity: 0.08
					}
				}
			}
		}
	},
	onLoad() {

		this.getServeData()
		this.getServerDataColumn()
	},
	methods: {
		getServeData() {
			setTimeout(() => {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					categories: ["2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10"],
					series: [{
						name: "用电量（度）",
						data: [125, 133, 148, 144, 137, 143]
					},
					{
						name: "使用次数",
						data: [53, 57, 61, 59, 55, 58]
					},
					{
						name: "平均每次用电量（度）",
						data: [2.36, 2.33, 2.43, 2.44, 2.49, 2.47]
					},
					{
						name: "长途使用次数",
						data: [10, 12, 14, 13, 12, 13]
					},
					{
						name: "短途使用次数",
						data: [43, 45, 47, 46, 43, 45]
					}
					]
				};
				this.chartData = JSON.parse(JSON.stringify(res));
			}, 500);
		},
		getServerDataColumn() {
			setTimeout(() => {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					categories: ["2024-05", "2024-06", "2024-07", "2024-08", "2024-09", "2024-10"],
					series: [{
						name: "行驶里程（公里）",
						data: [1200, 1350, 1180, 1420, 1250, 1300]
					},
					{
						name: "平均油耗（升/百公里）",
						data: [8.5, 8.2, 8.8, 8.3, 8.6, 8.4]
					},
					{
						name: "充电次数",
						data: [5, 6, 4, 7, 5, 6]
					},
					{
						name: "保养提醒（剩余里程）",
						data: [800, 750, 900, 850, 780, 820]
					},
					{
						name: "轮胎压力（PSI）",
						data: [32, 33, 31, 34, 32, 33]
					}
					]
				};
				this.chartDatacolumn = JSON.parse(JSON.stringify(res));
			}, 500);
		}

	},
	components: {
		Nav
	},
}
</script>

<style></style>