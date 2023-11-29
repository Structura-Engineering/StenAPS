import { md5 } from "./md5.js";

/**
 * Class representing image security.
 */
class ImageSecurity {
  /**
   * Create a new ImageSecurity instance.
   */
  constructor() {
    this.images = document.querySelectorAll("img[data-obfuscate]");
    this.addEventListeners();
    this.obfuscateImageURLs();
  }

  /**
   * Add event listeners to prevent certain actions on obfuscated images.
   */
  static addEventListeners() {
    document.addEventListener("contextmenu", (event) => {
      if (event.target.matches("img[data-obfuscate]")) {
        event.preventDefault();
      }
    });

    document.addEventListener("dragstart", (event) => {
      if (event.target.matches("img[data-obfuscate]")) {
        event.preventDefault();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.ctrlKey &&
        (event.key === "c" || event.key === "i") &&
        event.target.matches("img[data-obfuscate]")
      ) {
        event.preventDefault();
      }
    });
  }

  /**
   * Generate a unique filename using the MD5 hash of the original filename.
   * @param {string} originalFilename - The original filename.
   * @return {string} The unique filename.
   */
  static generateUniqueFilename(originalFilename) {
    const hash = md5(originalFilename);
    const fileExtension = originalFilename.substring(
      originalFilename.lastIndexOf(".") + 1,
    );
    const uniqueFilename = `${hash}.${fileExtension}`;
    return uniqueFilename;
  }

  /**
   * Obfuscate the URLs of all images marked for obfuscation.
   */
  obfuscateImageURLs() {
    this.images.forEach((image) => {
      const originalSrc = image.getAttribute("src");
      const uniqueFilename = ImageSecurity.generateUniqueFilename(originalSrc);
      image.setAttribute("src", uniqueFilename);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new ImageSecurity());
