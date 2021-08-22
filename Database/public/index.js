function enableDisableCheckbox(){
    
    let tagCheckBox = document.getElementById('tag-check');
    let tagInputBox = document.getElementById('tag-box');
    
    if (tagCheckBox.checked === true){
        tagInputBox.disabled = false
    }else{
        tagInputBox.disabled = true
    }    
}

