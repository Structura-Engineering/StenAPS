class ContainerSwitcher {
  constructor() {
    this.primaryBody = document.querySelector(".container#primary");
    this.secondaryBody = document.querySelector(".container#secondary");
    this.returnButton = document.getElementById("return-button");

    this.toolItems = ["docker", "nodejs", "cpp", "py"].map((id) =>
      document.getElementById(id),
    );

    this.toolItems.forEach((item) => {
      item.addEventListener("click", this.switchToSecondary.bind(this));
    });

    this.returnButton.addEventListener(
      "click",
      this.switchToPrimary.bind(this),
    );

    this.switchToPrimary();
  }

  switchToPrimary() {
    console.log("Switched to primary");
    this.secondaryBody.style.display = "none";
    this.primaryBody.style.display = "block";
    this.returnButton.style.display = "none";
  }

  switchToSecondary() {
    console.log("Switched to secondary");
    this.primaryBody.style.display = "none";
    this.secondaryBody.style.display = "block";
    this.returnButton.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => new ContainerSwitcher());
