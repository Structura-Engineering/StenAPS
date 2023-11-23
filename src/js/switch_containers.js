window.onload = function () {
  const mainBody = document.getElementById("primary");
  const wizardBody = document.getElementById("secondary");

  const docsItem = document.getElementById("docs");
  const cppItem = document.getElementById("cpp");
  const pyItem = document.getElementById("py");

  const toolItems = [docsItem, cppItem, pyItem];
  toolItems.forEach(function (item) {
    item.addEventListener("click", function () {
      console.log("clicked");
      mainBody.style.display = "none";
      wizardBody.style.display = "block";
    });
  });

  const returnButton = document.getElementById("return-button");

  returnButton.addEventListener("click", function () {
    console.log("clicked");
    wizardBody.style.display = "none";
    mainBody.style.display = "block";
  });
};
