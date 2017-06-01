/*
This is empty on purpose! Your code to build the resume will go here.
 */
var work = {
  "jobs": [
    {
      "employer": "",
      "title": "",
      "location": "",
      "dates": "",
      "description": ""
    },
    {
      "employer": "",
      "title": "",
      "location": "",
      "dates": "",
      "description": ""
    }
  ]
}

var projects = {
  "projects": [
    {
      "title": "",
      "date": "",
      "description": "",
      "image": []
    }
  ]
}

var bio = {
  "name": "qzs",
  "role": "Web Developer",
  "contacts": {
    "mobile": "131-3881-3660",
    "email": "ylyznl@outlook.com",
    "github": "WispAmulet",
    "twitter": "@y_lyznl",
    "location": "DongGuan"
  },
  "welcomeMessage": "Keep Workin'",
  "skills": [
    "HTML/CSS", "Javascript", "jQuery", "SCSS", "React", "Redux", "Webpack"
  ],
  "bioPic": "images/me.jpg"
}

var education = {
  "schools": [
    {
      "name": "ChangSha University",
      "location": "ChangSha, Hunan, China",
      "degree": "",
      "dates": "",
      "url": ""
    }
  ]
}

if (bio.skills.length > 0) {
  $('#header').append(HTMLskillsStart);

  var formattedSkill = HTMLskills.replace('%data%', bio.skills[0]);
  $('#skills').append(formattedSkill);
  formattedSkill = HTMLskills.replace('%data%', bio.skills[1]);
  $('#skills').append(formattedSkill);
}