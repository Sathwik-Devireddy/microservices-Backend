const urlVersioning = (version) => (req, res, next) => {
  if (req.path.startsWith(`/api/${version}`)) {
    next();
  } else {
    res.status(404).json({ success: false, message: "Invalid API version" });
  }
};
const headerVersioning = (version) => (req, res, next) => {
  if (req.get("Accept-Version") === version) {
    next();
  } else {
    res.status(404).json({ success: false, message: "Invalid API version" });
  }
};

const contentTypeVersioning = (version) => (req, res, next) => {
  const contentType = req.get("Content-Type");

  if (
    contentType &&
    contentType.includes(`application/vnd.myapp.v${version}+json`)
  ) {
    next();
  } else {
    res.status(404).json({ success: false, message: "Invalid API version" });
  }
};

module.exports = { urlVersioning, headerVersioning, contentTypeVersioning };
