

d3.selectAll(".myCheckbox").on("change", updateChoices);

function updateChoices(){

    var choices = [];
    d3.selectAll(".myCheckbox").each(function(d){
      check = d3.select(this);
      if(check.property("checked")){
        choices.push(check.property("value"));
      }
    });

    currentChoices = choices;

    // console.log(choices)

    updateData();
}