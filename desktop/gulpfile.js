/*
* Dependencias
*/
var gulp = require('gulp'),
  del = require('del'),
  runSequence = require('run-sequence'),
  gulpIf = require('gulp-if'),
  ssh_deploy = require('gulp-ssh-deploy');

var exec = require('child_process').exec;

/*
* Ubicacion de archivos
*/
var sourceRoot = "dist/";
var deletePath = [sourceRoot + '/**'];
var options = {
  "host": "104.237.155.175",
  "port": 22,
  "package_json_file_path": "package.json",
  "source_files": "dist/*",
  "remote_directory": "/var/www/html/turnero.folderit.net/public_html",
  "username": "turnero",
  "ssh_key_file": "/users/084/pvkTurnero/private.ppk",
  "group": null,
  "permissions": "ugo+rX",
  "package_task": "",
  "passphrase": "ElevenFacingWallIdea",
};

var mGulpSHH = new ssh_deploy.GulpSSHDeploy(options, gulp);

/*
* Build para produccion
*/
gulp.task('buildProd', function(){
  devMode = false;
  gulp.start('cleanBuild')
});

/*
* Limpia y buildea
*/
gulp.task('cleanBuild', function () {
  runSequence('clean', 'ngBuild','copyToServer');
});

gulp.task('copyToServer', function () {
  gulp.start('transferDistribution');
})

/*
* Ejecuta ng build en en consola
 */
gulp.task('ngBuild', function (cb) {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

/*
* Borra el contenido del path destino
*/
gulp.task('clean', function () {
  return del(deletePath);
});

