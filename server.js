
//설치한 express framework 를 사용하겠다는 명시
const express = require('express'); //상수선언 require : 패키지 불러오기
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express(); //express를 이용해 app(웹 프로그램)을 생성한다.
const port = process.env.PORT || 8000;
const mysql = require ('mysql'); //mysql 패키지 불러오기 및 연결하기
const connection = mysql.createConnection({
	host : 'localhost', //연결할 호스트 정보
	port : 3306,        //포트번호
	user : 'root',      // 사용자 이름
	password : '9428duseh',  // 비번
	database : 'new_schema'   // db이름
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connection.connect();

app.all('/*', (req,res,next) => {

	// 모든 설정, 모든 요청을 허용한다
	// 모든 서버의 요청과 모든 설정을 허용하면 보안상 취약점이 발생할 수 있다.
	// 실제 프로젝트에서는 해당 요건에 따라서 아래 설정을 달리한다.
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods","*"); 

	next();
	// "*" -> 모든 도메인들에 대해서 허용한다. "/특정 url 주소값" -> 특정된 url 주소값 허용한다. 
});




//라우터 (라우팅)--------------------------------------------------------------------------------------------
//클라이언트에서 주소값으로 들어온 요청을 처리하는 함수
//요청객체와 응답객체 (request response)
//요청 데이터는 req 안에, 그 요청에 대한 응답은 res를 통해서

// -- 데이터 가져오기
app.get('/api/daily', (req, res) => {

	let data={};
	// let query="SELECT * FROM dailyreport WHERE id LIKE '" +id+ "%' ";
	let query="SELECT * FROM dailyreport";
	let id = req.params.id;

	connection.query((query) , (error, results) => {
		if (error) {
			console.log("에러 발생",error);
		} else {
			console.log("성공:",results);
			data.items=results;
			res.json(data);
		}
	});
	
});

//설정 가져오기
app.get('/api/settings', (req, res) => {

	let data={};
	let query="SELECT * FROM daily_setting";

	connection.query((query) , (error, results) => {
		if (error) {
			console.log("에러 발생",error);
		} else {
			console.log("설정 성공:",results.data);
			data.settings=results;
			res.json(data);
		}
	});
	
});






// -- 프론트로부터 넘겨받은 데이터를 DB에 저장하는 라우터

// -- 일정추가
app.post('/api/add', (req,res) => {
	console.log("add 요청 들어옴");
	let id = req.body.id ; //날짜
	let action = req.body.action ; //일정제목
	let note = req.body.note ; //일정내용
	let open = req.body.open; //open
	let score = req.body.score; //평가

	connection.query("INSERT INTO dailyreport (id, action, note, open, score) VALUES ('" +id+ "', '" +action+ "', '" +note+ "', '" +open+ "', '" +score+ "')", (error,results) => {    // mysql쿼리문연결

		if (error) {
			console.log("에러발생 : ",error);
		} else {
			console.log("저장결과 : ",results);
			res.json({ result : 'success' });
		}
	});
	
});





// -- 수정 처리 라우터
app.put('/api/update',(req,res)=> {
	console.log("update 요청 들어옴");
	// let query ="";
	let id = req.body.id ; //날짜
	let action = req.body.action ; //일정제목
	let note = req.body.note ; //일정내용
	let open = req.body.open; //open
	let score = req.body.score; //평가

	connection.query("INSERT INTO dailyreport (id, action, note, open, score) VALUES ('" +id+ "', '" +action+ "', '" +note+ "', '" +open+ "', '" +score+ "')",
			(error,results) => {
		if (error) {
			console.log("에러발생 : ",error);
		} else {
			console.log("수정결과 : ",results);
			res.json({result: 'success'});
		}

	});
})


//설정 저장
app.put('/api/savesettings',(req,res)=> {
	console.log("settings 요청 들어옴");
	// let query ="";
	// let id = req.body.id ; //날짜
	let lang = req.body.lang ; //언어
	let starttime = req.body.starttime ; //일정내용

	connection.query("UPDATE daily_setting SET starttime='"+starttime+"', lang='"+lang+"'  WHERE id=1",
			(error,results) => {
		if (error) {
			console.log("에러발생 : ",error);
		} else {
			console.log("수정결과 : ",results);
			res.json({result: 'success'});
		}

	});
})






// -- DB데이터 삭제하는 라우터
// app.delete('/api/delete/:id',(req,res) => {
// 	console.log("delete 요청 들어옴");
// 	let id = req.params.id; //주소값으로 받을 때는 params 객체를 사용한다.

// 	connection.query("DELETE FROM dailyreport WHERE id="+id,(error,results)=>{
// 		if (error) {
// 			console.log(error);
// 			connection.end();
// 		} else {
// 			console.log(results);
// 			res.json({result: 'success'});
// 		}
// 	});
// })



app.listen(port, () => console.log(`Listening on port ${port} !!!!!!!!!`));


