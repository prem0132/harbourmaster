pipeline {
  agent {
    docker {
      image 'mhart/alpine-node:10'
      args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
    }
  }
  stages{
      stage('docker build'){
          sh 'docker build -t premhashmap/harbourmaster:latest .'
      }
      stage('docker push'){
          withCredentials(bindings: [usernamePassword(credentialsId: 'dockerhubPWD', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
              sh 'sudo docker login -u $USERNAME -p $PASSWORD'
          }
          sh 'sudo docker push premhashmap/harbourmaster:latest'
       }   
    }
  post {
    always {
      sh 'chmod -R 777 .'
    }
  }
}

