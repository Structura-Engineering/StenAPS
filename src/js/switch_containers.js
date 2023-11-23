class ContainerSwitcher {
  constructor() {
    this.mainBody = document.querySelector(".container#primary");
    this.wizardBody = document.querySelector(".container#secondary");

    this.cppItem = document.getElementById("cpp");
    this.pyItem = document.getElementById("py");
    this.nodejsItem = document.getElementById("nodejs");

    this.toolItems = [this.nodejsItem, this.cppItem, this.pyItem];
    this.toolItems.forEach((item) => {
      item.addEventListener("click", () => {
        console.log("clicked");
        this.mainBody.style.display = "none";
        this.wizardBody.style.display = "block";
      });
    });

    this.returnButton = document.getElementById("return-button");
    this.returnButton.addEventListener("click", () => {
      console.log("clicked");
      this.wizardBody.style.display = "none";
      this.mainBody.style.display = "block";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new ContainerSwitcher());
