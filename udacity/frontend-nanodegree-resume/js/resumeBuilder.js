/*
This is empty on purpose! Your code to build the resume will go here.
 */
var work = {
  "jobs": [
    {
      "employer": "ChangSha Feisi",
      "title": "Web learner",
      "location": "ChangSha",
      "dates": "2016-07~2016-10",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    },
    {
      "employer": "XingBao",
      "title": "Lab assistant",
      "location": "DongGuan",
      "dates": "2017-03~2017-04",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    }
  ]
}

var projects = {
  "projects": [
    {
      "title": "Weather",
      "date": "2017-05-31",
      "description": "Weather App with React and Redux",
      "image": [
        "images/197x148.gif",
        "images/197x148.gif"
      ]
    }
  ]
}

var bio = {
  "name": "qi zs",
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
  "bioPic": "images/fry.jpg"
}

var education = {
  "schools": [
    {
      "name": "ChangSha University",
      "location": "ChangSha, Hunan, China",
      "degree": "bacjelor degree",
      "dates": "2012-09~2016-06",
      "url": "http://www.ccdx.com",
      "major": "Software Engineer"
    }
  ]
}

if (bio.role) {
  var headerRole = HTMLheaderRole.replace('%data%', bio.role);
  $('#header').prepend(headerRole);
}
if (bio.name) {
  var headerName = HTMLheaderName.replace('%data%', bio.name);
  $('#header').prepend(headerName);
}

if (bio.contacts) {
  // for (var i in bio.contacts) {
  //   i = HTMLcontactGeneric.replace('%contact%', i);
  //   $('#header').append(i);
  // }

  var mobile = HTMLmobile.replace('%data%', bio.contacts.mobile);
  $('#topContacts').append(mobile);
  var email = HTMLemail.replace('%data%', bio.contacts.email);
  $('#topContacts').append(email);
  var github = HTMLgithub.replace('%data%', bio.contacts.github);
  $('#topContacts').append(github);
  var twitter = HTMLtwitter.replace('%data%', bio.contacts.twitter);
  $('#topContacts').append(twitter);
  var locaTion = HTMLlocation.replace('%data%', bio.contacts.location);
  $('#topContacts').append(locaTion);
}

if (bio.bioPic) {
  var pic = HTMLbioPic.replace('%data%', bio.bioPic);
  $('#header').append(pic);
}

if (bio.welcomeMessage) {
  var msg = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);
  $('#header').append(msg);
}

if (bio.skills) {
  $('#header').append(HTMLskillsStart);

  bio.skills.forEach((skill) => {
    skill = HTMLskills.replace('%data%', skill);
    $('#skills').append(skill);
  });
}

if (bio.contacts) {

  var mobile = HTMLmobile.replace('%data%', bio.contacts.mobile);
  $('#footerContacts').append(mobile);
  var email = HTMLemail.replace('%data%', bio.contacts.email);
  $('#footerContacts').append(email);
  var github = HTMLgithub.replace('%data%', bio.contacts.github);
  $('#footerContacts').append(github);
  var twitter = HTMLtwitter.replace('%data%', bio.contacts.twitter);
  $('#footerContacts').append(twitter);
  var locaTion = HTMLlocation.replace('%data%', bio.contacts.location);
  $('#footerContacts').append(locaTion);
}

if (work.jobs) {
  $('#workExperience').append(HTMLworkStart);

  for (index in work.jobs) {
    var employer = HTMLworkEmployer.replace('%data%', work.jobs[index]["employer"]);
    var title = HTMLworkTitle.replace('%data%', work.jobs[index]["title"]);
    var employerTitle = employer + title;
    $('.work-entry').append(employerTitle);
    var dates = HTMLworkDates.replace('%data%', work.jobs[index]["dates"]);
    $('.work-entry').append(dates);
    var locaTion = HTMLworkLocation.replace('%data%', work.jobs[index]["location"]);
    $('.work-entry').append(locaTion);
    var description = HTMLworkDescription.replace('%data%', work.jobs[index]["description"]);
    $('.work-entry').append(description);
  }
}

// $(document).click(function (e) {
//   e.preventDefault();
//   var x = e.pageX;
//   var y = e.pageY;
//   logClicks(x, y);
// });

// $('#main').append(internationalizeButton);

// var inName = function () {
//   var name = bio.name.split(' ');
//   name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1);
//   name[1] = name[1].slice(0, 1).toUpperCase() + name[1].slice(1);
//   name = name.join(' ');
//   console.log(name);
// };

if (projects.projects) {
  $('#projects').append(HTMLprojectStart);

  projects.display = function () {
    projects.projects.forEach((project) => {
      var title = HTMLprojectTitle.replace('%data%', project.title);
      $('.project-entry').append(title);
      var date = HTMLprojectDates.replace('%data%', project.date);
      $('.project-entry').append(date);
      var description = HTMLprojectDescription.replace('%data%', project.description);
      $('.project-entry').append(description);
      project.image.forEach((image) => {
        var image = HTMLprojectImage.replace('%data%', image);
        // console.log(image);
        $('.project-entry').append(image);
      });
    });
  };
  projects.display();
}

if (education.schools) {
  $('#education').append(HTMLschoolStart);

  education.schools.forEach((school) => {
    var name = HTMLschoolName.replace('%data%', school.name);
    var degree = HTMLschoolDegree.replace('%data%', school.degree);
    var nameDegree = name + degree;
    $('.education-entry').append(nameDegree);
    var dates = HTMLschoolDates.replace('%data%', school.dates);
    $('.education-entry').append(dates);
    var location = HTMLschoolLocation.replace('%data%', school.location);
    $('.education-entry').append(location);
    var major = HTMLschoolMajor.replace('%data%', school.major);
    $('.education-entry').append(major);
  });
}

$('#mapDiv').append(googleMap);