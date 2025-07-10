const express = require('express');
const cors = require('cors');
const app = express();
const  Login = require ('./Controller/LoginController');
const Skill = require ('./Controller/SkillController');
const Project = require ('./Controller/ProjectController');
const Education = require ('./Controller/EducationController');
const Achievement = require ('./Controller/AchievementController');
const Certification = require ('./Controller/CertificationController');
const authMiddleware = require('./Middleware/authMiddleware')

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/Login',  Login.loginController );

app.get('/Skill', Skill.skilldata);

app.post('/AddSkill',authMiddleware, Skill.AddSkill);

app.post('/deleteskill', Skill.deleteSkill);

app.post('/addproject', authMiddleware , Project.addProjects)

app.get('/projectdata', Project.projectData)

app.post('/deleteproject', Project.deleteProject);

app.get('/educationdata', Education.educationData);

app.post('/addeducation', Education.addEducation);

app.post('/deleteeducation', Education.deleteEducation);

app.get('/achievementdata', Achievement.achievementData);

app.post('/addachievement',authMiddleware, Achievement.addAchievement);

app.post('/deleteachievement', Achievement.deleteAchievement);

app.get('/certificationdata', Certification.certificationData);

app.post('/addcertification', Certification.addCertification);

app.post('/deletecertification', Certification.deleteCertification);

app.post('/verify', authMiddleware, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
  });
  