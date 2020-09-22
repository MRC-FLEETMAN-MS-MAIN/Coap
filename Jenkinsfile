node {
    
    stage('Preparation') { 
      
        git 'https://github.com/MRC-FLEETMAN-MS-MAIN/Coap'
      
    }
  
    
     stage('Deploy'){
        
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'awscred', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
    ansiblePlaybook credentialsId: 'sshcred', installation: 'ansible-installation', playbook: 'deploy.yaml'
}
        
       
    }
       
    
    
}
