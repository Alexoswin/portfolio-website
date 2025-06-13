const express = require('express');
const cors = require('cors');
const app = express();
const  Login = require ('./Controller/LoginController');
const Skill = require ('./Controller/SkillController');
const Project = require ('./Controller/ProjectController');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/Login',  Login.loginController );

app.get('/Skill', Skill.skilldata);

app.post('/AddSkill', Skill.AddSkill);

app.post('/addproject', Project.addProjects)

app.get('/projectdata', Project.projectData)

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
  });
  