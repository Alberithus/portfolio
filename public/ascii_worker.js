self.onmessage = function (e) {
  try {
    const {
      pixels,
      width,
      height,
      brightness,
      contrast,
      invert,
      charList,
    } = e.data;

    if (!pixels || !charList || charList.length === 0) {
      self.postMessage({ error: "Missing required arguments" });
      return;
    }

    const len = width * height;
    const chars = new Array(len);
    const colors = new Uint8Array(len * 3);

    const contrastVal = contrast;
    const factor = (259 * (contrastVal + 255)) / (255 * (259 - contrastVal));
    const numChars = charList.length;

    for (let i = 0; i < len; i++) {
      const idx = i * 4;
      let r = pixels[idx];
      let g = pixels[idx + 1];
      let b = pixels[idx + 2];

      if (brightness !== 0) {
        r += brightness;
        g += brightness;
        b += brightness;
      }

      if (contrastVal !== 0) {
        r = factor * (r - 128) + 128;
        g = factor * (g - 128) + 128;
        b = factor * (b - 128) + 128;
      }

      r = r < 0 ? 0 : (r > 255 ? 255 : r);
      g = g < 0 ? 0 : (g > 255 ? 255 : g);
      b = b < 0 ? 0 : (b > 255 ? 255 : b);

      const cIdx = i * 3;
      colors[cIdx] = r;
      colors[cIdx + 1] = g;
      colors[cIdx + 2] = b;

      let gray = 0.299 * r + 0.587 * g + 0.114 * b;

      if (invert) {
        gray = 255 - gray;
      }

      const charIdx = Math.floor((gray / 255.1) * numChars);
      chars[i] = charList[charIdx] || " ";
    }

    self.postMessage({
      chars,
      colors,
      width,
      height
    }, [colors.buffer]);
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};
