function filter()
{
    specialist=$("#specialist").val()
    locate=$("#location").val()
    location.href="/ui/search/"+specialist+"/"+locate;

}

function ap()
{
    location.href="/ui/appointments/"+localStorage.userid;
}