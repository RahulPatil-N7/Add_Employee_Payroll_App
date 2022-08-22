window.addEventListener('DOMContentLoaded', (event) => {
    validName();
    salaryRange();
});

function validName(){
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length < 3 ) {
            textError.textContent = "Name should have minimum 3 characters!";
            return;
        }
        try {
            let empData=new EmployeePayrollData();
            empData.name=name.value;
            textError.textContent = "";
        }
        catch (e) {
            textError.textContent = e;
        }
    });
}


/** set event listener on salary range*/
function salaryRange(){
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
}

const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();

    }
    catch(e){
        return;
    }
    alert(employeePayrollData.toString());
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        employeePayrollData.startDate = new Date(Date.parse(date));
        setTextValue('.date-error', e)
    employeePayrollData.date= Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked == true)
            setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}

const resetForm = () =>{
    setValue('#name',''); 
    unsetSelectedValues('[name=profile]'); 
    unsetSelectedValues('[name=gender]'); 
    unsetSelectedValues('[name=department]'); 
    setValue('#salary',''); 
    setValue('#notes',''); 
    setValue('#day','1'); 
    setValue('#month', 'January'); 
    setValue( '#year', '2022');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorall(propertyValue); 
    allItems.forEach(item => {
    item.checked = false; 
    }); 
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id); 
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id); 
    element.value = value;
}

