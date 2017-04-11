$(function(){ 


	if(sessionStorage.uname){
		//切换用户
			$('#btn_login').click(function(){ 
		        $.ajax({
		            type:'post',
		            url:'http://192.168.43.197:8005/loginUp/login',
		            data:{
		                uname:$('#loginuname').val(),
		                pwd:base.encode($('#loginpwd').val())
		            },
		            success:function(e){
		                console.log(e)
		                alert()
		                if(e.flag == 1){
		//                  window.location.href = 'html/homepage.html';
		                    localStorage.user_id = e.list.id;
		                }else if(e.flag == 2){
		                    alert('用户名不存在')
		                }else if(e.flag == 3){
		                    alert('密码错误')
		                }
		            },error:function(){
		                aler('error')
		            }
		        })
		    })
				
		//	//提交头像
			var files;
			$(".tx").click(function() { //点击切换头像
				$("#file_tx").click();
				$("#file_tx").change(function() {
					files = this.files[0];
					read = new FileReader();
					read.readAsDataURL(files);
					read.onload = function() {
						$(".tx")[0].innerHTML = "<img src='" + this.result + "'/>";
						$('#header_p').innerHTML = "<img src='" + this.result + "'/>";
					}
				})
			});
			//上传头像
			$("#submit_tx").click(function(){
				var fd = new FormData();
				fd.append('file_tx',files);
				$.ajax({
					type:"post",
					url:"http://192.168.43.197:8005/register/up",
					data:fd,
					async:true,
					contentType:false,
					processData:false,
					success:function(data){
						$.ajax({
							type:'post',
							url:'http://192.168.43.197:8005/register/userImg',
							data:{
								userImg:data,
								uId:sessionStorage.user_id
							},
							success:function(e){
								if(e.flag == 1){
									window.location.reload();
									alert('提交成功')
								}else{
									alert('提交失败')
								}
							},error:function(){
								alert('login .. error')
							}
						})
					},
					error:function(){
						
					}
				});
			});

		// 获取头像
			$.ajax({
				type:'get',
				url:'http://192.168.43.197:8005/register/getuImg',
				data:{
					getId:sessionStorage.user_id
				},success:function(e){
					// console.log(e[0].userImg)
					$('#header_p').html('<img src="http://192.168.43.197:8005/upload/'+e[0].userImg+'"/>')
				},error:function(){
					alert('error')
				}
			})



			var staffPage = document.getElementsByClassName('staff_page')[0];
			var depaData = document.getElementsByClassName('depa_data');
			$.ajax({
				type:"get",
				url:"http://192.168.43.197:8005/index/list",
				async:true,
				success:function(data){
					//各部门的人数
		//			var arrR = 0,
		//				arrJ = 0,
		//				arrC = 0,
		//				arrS = 0,
		//				arrSum = 0;
							
					var arr2016 = [0,0,0,0,0];
					var arr2017 = [0,0,0,0,0];
					
					var oBox = document.createElement('div');
					oBox.id = 'box';
					for (var i=0;i<data.length;i++) {
						var dataYer = data[i].entryTime.split('-')[0];
						if (parseInt(dataYer) <= 2015) {
							arr2016[0]++
							if (data[i].department == 'r') {
								arr2016[1]++
							} else if (data[i].department == 'j') {
								arr2016[2]++
							} else if (data[i].department == 'c') {
								arr2016[3]++
							} else if (data[i].department == 's') {
								arr2016[4]++
							}
						} else if(parseInt(dataYer) <= 2017){
							arr2017[0]++
							if (data[i].department == 'r') {
								arr2017[1]++
							} else if (data[i].department == 'j') {
								arr2017[2]++
							} else if (data[i].department == 'c') {
								arr2017[3]++
							} else if (data[i].department == 's') {
								arr2017[4]++
							}
						}
						
						
						if (data[i].department == 'r') {
							data[i].department = '人事部';
		//					arrR.push(data[i])
						} else if(data[i].department == 'j'){
							data[i].department = '技术部';
		//					arrJ.push(data[i])
						} else if(data[i].department == 'c'){
							data[i].department = '财务部';
		//					arrC.push(data[i])
						} else if(data[i].department == 's'){
							data[i].department = '市场部';
		//					arrS.push(data[i])
						}else{
							data[i].department = '其他';
						};
						
						//新入职员工信息
						var straffMasssage = document.createElement('div');
						straffMasssage.className = 'staff_message';
						straffMasssage.innerHTML = '<a href="detail.html?id='+data[i].id+'">'+
								 						'<img src="http://192.168.43.197:8005/upload/'+data[i].img+'"/>'+
														'<span>'+data[i].name+'</span>'+
														'<span>工号：'+data[i].workNumber+'</span>'+
														'<p>入职时间：'+data[i].entryTime+'</p>'+
													'</a>';
													
						staffPage.appendChild(straffMasssage);
						staffPage.appendChild(oBox);
						
						//部门管理员信息
						if (data[i].zy == '市场部主任') {
							depaData[0].innerHTML = '<a href="detail.html?id='+data[i].id+'">'+
														'<img src="http://192.168.43.197:8005/upload/'+data[i].img+'" />'+
													'</a>'+
													'<h4>'+data[i].name+'</h4>'+
													'<p>部门：<span>'+data[i].department+'</span></p>'+
													'<p>职位：<span>'+data[i].zy+'</span></p>'+
													'<p>工号：<span>'+data[i].workNumber+'</p>';
							
						}else if(data[i].zy == '技术总监'){
							depaData[1].innerHTML = '<a href="detail.html?id='+data[i].id+'">'+
														'<img src="http://192.168.43.197:8005/upload/'+data[i].img+'" />'+
													'</a>'+
													'<h4>'+data[i].name+'</h4>'+
													'<p>部门：<span>'+data[i].department+'</span></p>'+
													'<p>职位：<span>'+data[i].zy+'</span></p>'+
													'<p>工号：<span>'+data[i].workNumber+'</p>';
						}else if(data[i].zy == '人事部主管'){
							depaData[2].innerHTML = '<a href="detail.html?id='+data[i].id+'">'+
														'<img src="http://192.168.43.197:8005/upload/'+data[i].img+'" />'+
													'</a>'+
													'<h4>'+data[i].name+'</h4>'+
													'<p>部门：<span>'+data[i].department+'</span></p>'+
													'<p>职位：<span>'+data[i].zy+'</span></p>'+
													'<p>工号：<span>'+data[i].workNumber+'</p>';
						}else if(data[i].zy == '财务经理'){
							depaData[3].innerHTML = '<a href="detail.html?id='+data[i].id+'">'+
														'<img src="http://192.168.43.197:8005/upload/'+data[i].img+'" />'+
													'</a>'+
													'<h4>'+data[i].name+'</h4>'+
													'<p>部门：<span>'+data[i].department+'</span></p>'+
													'<p>职位：<span>'+data[i].zy+'</span></p>'+
													'<p>工号：<span>'+data[i].workNumber+'</p>';
						}
						
						
						
					};
					//折线图
					var ChartZ = echarts.init(document.getElementById('charts_z'));
					option = {
					    title: {
					        text: '近两年公司人数占比',
					        subtext: '数据来公司内部'
					    },
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					            type: 'shadow'
					        }
					    },
					    legend: {
					        data: ['2011年', '2012年']
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: {
					        type: 'value',
					        boundaryGap: [0, 0.01]
					    },
					    yAxis: {
					        type: 'category',
					        data: ['公司人数','人事部','技术部','财务','市场部']
					    },
					    series: [
					        {
					            name: '2016年',
					            type: 'bar',
					            data: arr2016
					        },
					        {
					            name: '2017年',
					            type: 'bar',
					            data: arr2017
					        }
					    ],
					    color:['#D9B3E7','#81C3D7']
					};
					ChartZ.setOption(option)
					
					
					
					
						
				},complete:function(){
					$('.staff_box').height($('.staff_box div').height() * 2)
					$('#box').html($('.staff_page').html());
					var wid = $('.staff_box').height($('#box').height() * 2).height();
		//			console.log(wid)
					var timer = null;
					clearInterval(timer);
					timer = setInterval(function() {
						var ml = parseInt($('.staff_box').css('top'));
						$('.staff_box').css({
							'top': --ml
						});
						if(ml < -wid / 2) {
							$('.staff_box').css({
								'top': 0
							})
						}
					}, 30)
				
					$('.staff_box').hover(function() {
						clearInterval(timer)
					}, function() {
						timer = setInterval(function() {
							var ml = parseInt($('.staff_box').css('top'));
							$('.staff_box').css({
								'top': --ml
							})
							if(ml < -wid / 2) {
								$('.staff_box').css({
									'top': 0
								})
							}
						}, 30)
					});
				},
				error:function(){
					alert("数据传输错误！")
				}
			});
	}else{
		alert('请登录')
	}

	
			
})