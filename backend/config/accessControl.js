const AccessControl = require("accesscontrol");

const grantObjects = {
  CHW: {
    chw: {
      "read:any": ["*"],
      "delete:own": ["*"],
      "update:own": ["*"],
      "create:any": ["*"],
    },
    patient: {
      "read:any": ["*"],
      "delete:any": ["*"],
      "update:any": ["*"],
      "create:any": ["*"],
    },
    visit: {
      "read:any": ["*"],
      "create:any": ["*"],
    },
    diagnosis: {
      "read:any": ["*"],
    },
  },
  DOCTOR: {
    doctor: {
      "read:any": ["*"],
      "delete:any": ["*"],
      "update:any": ["*"],
      "create:any": ["*"],
    },
    patient: {
      "read:any": ["*"],
    },
    diagnosis: {
      "read:any": ["*"],
      "create:any": ["*"],
      "update:any": ["*"],
    },
    visit: {
      "read:any": ["*"],
    },
  },
};

const ac = new AccessControl(grantObjects);

const isPermissionGranted = (role, resource, action) => {
  switch (action) {
    case "READ_ANY": {
      const permission = ac.can(role).readAny(resource);
      return permission.granted;
    }
    case "CREATE_ANY": {
      const permission = ac.can(role).createAny(resource);
      return permission.granted;
    }
    case "DELETE_ANY": {
      const permission = ac.can(role).deleteAny(resource);
      return permission.granted;
    }
    case "UPDATE_ANY": {
      const permission = ac.can(role).updateAny(resource);
      return permission.granted;
    }
    case "READ_OWN": {
      const permission = ac.can(role).readOwn(resource);
      return permission.granted;
    }
    case "CREATE_OWN": {
      const permission = ac.can(role).createOwn(resource);
      return permission.granted;
    }
    case "DELETE_OWN": {
      const permission = ac.can(role).deleteOwn(resource);
      return permission.granted;
    }
    case "UPDATE_OWN": {
      const permission = ac.can(role).updateOwn(resource);
      return permission.granted;
    }
  }
};

module.exports = { isPermissionGranted };
