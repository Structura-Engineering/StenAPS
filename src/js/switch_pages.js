/**
 * SwitchPages class.
 * This class is used to switch between different tool items on the page.
 */
class SwitchPages {
  /**
   * Constructor for the SwitchPages class.
   * Sets the window.onload event to the init method of this class.
   */
  constructor() {
    window.onload = this.init;
  }

  /**
   * The init method.
   * This method is called when the window is loaded.
   * It adds click event listeners to all elements with the class name "tool-item".
   * When a tool item is clicked, it removes the "active" class from the currently active tool item,
   * and adds the "active" class to the clicked tool item.
   */
  init() {
    const toolItems = document.getElementsByClassName("tool-item");
    for (let i = 0; i < toolItems.length; i++) {
      toolItems[i].addEventListener("click", function () {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }
}

// Wait for the DOM to be fully loaded before creating a new instance of SwitchPages
document.addEventListener("DOMContentLoaded", function () {
  const _ = new SwitchPages();
});
