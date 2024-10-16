// !----------------- LISTENING AND IMPLEMENTING ISSUE -----------------

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

   if (localStorage.getItem('issues') == null) {
    
    let issues = [];

    issues.push(issue);
    
    localStorage.setItem('issues', JSON.stringify(issues));

    } else {

    let issues = JSON.parse(localStorage.getItem('issues'));

    issues.push(issue);
    
    localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    
    fetchIssues();

    e.preventDefault();
}

// !----------------- CLOSED BUTTON ACTIVITIES -----------------

function setStatusClosed(id){

    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++){

        if (issues[i].id == id){

            issues[i].status = 'Closed';

        }
    }
 
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// !----------------- DELETE BUTTON ACTIVITIES -----------------


function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++){

        if (issues[i].id == id){
        
            issues.splice(i, 1);

        }
    }
 
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();

}
    

// !----------------- CREATE AN ISSUE ON HTML -----------------

function fetchIssues(){

    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++){

        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        issuesList.innerHTML += 
        
        '<div class="well my-3">'+ 
        '<h6>Issue ID: '+ id + '</h6>'+
        '<p><span class="status">'+ status + '</span></p>'+
        '<h3>' + desc + '</h3>'+
        '<p><i class="bi bi-alarm-fill"></i>'+" " + severity + '</p>'+
        '<p><i class="bi bi-person-fill"></i>'+ " " + assignedTo + '</p>'+
        '<button onclick="setStatusClosed(\'' + id + '\')" class="close-btn">Close</button>  ' +
        '<button onclick="deleteIssue(\'' + id + '\')" class="delete-btn">Delete</button>'+
        '</div>';
                               
    }

}