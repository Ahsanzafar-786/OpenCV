module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.example.app',
        productName: 'My Electron App',
        directories: {
          output: 'dist_electron'
        },
        win: {
          target: 'nsis', // Use nsis to create an installer
          icon: 'build/icon.ico' // Path to your icon file
        },
        nsis: {
          oneClick: false, // Allow the user to choose installation directory
          perMachine: true,
          allowElevation: true,
          allowToChangeInstallationDirectory: true
        }
      }
    }
  }
}
