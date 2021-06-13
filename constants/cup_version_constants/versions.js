CUP_VERSIONS = [
  CUP_VERSION_1,
  CUP_VERSION_2,
  CUP_VERSION_3,
  CUP_VERSION_4,
  CUP_VERSION_5,
];

// Gets version of the tour sheet
function getVersion() {
  if (!isTourSheet()) {
    return false;
  }
  versionNumber = getValue("A1").substring(14);
  var version = null;
  for each (var v in VERSION) {
    if (v.id == versionNumber) version = v;
  }
  return version || VERSION[0];
}

// Gets a specific data point from a version
function getDataFromVersion(propertyName, version) {
  if (!version) version = getVersion();
  return version[propertyName];
}