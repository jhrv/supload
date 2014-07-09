supload
=======

Simple Node.js utility for uploading Strava activities

1.  Create your own config.sh (use config.sh.template if you don't want to set your environment variables some other way) with correct Strava Token (see http://strava.github.io/api/v3/oauth/) and the path to your activity folder.

2.  Run it. 


##Run command examples:


    . config.sh && node app.js (simple)
    . config.sh && forever start -a -l forever.log -o out.log -e err.log app.js (using forever, npm install forever -g)
    
 
