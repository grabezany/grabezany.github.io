var version = "1.0"

function getVersion(){
  if(data.version != version){
    var ask = confirm("Looks like you're not on the latest version of Fishing Simulator. Would you like to update to version " + version +"?");
    if(ask){
      alert("successfully updated file to current version");
    } else {
      
    }
  }
}
