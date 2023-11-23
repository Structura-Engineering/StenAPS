window.onload = function () {
  var mainBody = document.getElementById("primary");
  var wizardBody = document.getElementById("secondary");

  var docsItem = document.getElementById("docs");
  var cppItem = document.getElementById("cpp");
  var pyItem = document.getElementById("py");

  var toolItems = [docsItem, cppItem, pyItem];
  toolItems.forEach(function (item) {
    item.addEventListener("click", function () {
      console.log("clicked");
      mainBody.style.display = "none";
      wizardBody.style.display = "block";
    });
  });

  var returnButton = document.getElementById("return-button");

  returnButton.addEventListener("click", function () {
    console.log("clicked");
    wizardBody.style.display = "none";
    mainBody.style.display = "block";
  });
};
