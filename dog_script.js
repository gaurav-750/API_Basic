
$('#form-id').click(myFunction);

var dogImages = $('#dog-images');
let dogBreed = $('#breed-id');
let containsSubBreed = false;

var searchBreedBtn = $('#are-there-breeds');
searchBreedBtn.click(searchBreedFunction);

function searchBreedFunction(event){
    event.preventDefault();

    let breed = dogBreed.val();
    console.log('breed', breed);

    if (breed == "") {
        alert("Enter breed!");
        return;
    }

    let url = 'https://dog.ceo/api/breed/' + breed + '/list';

    $.get(url, function(data){
        console.log('data', data);

        if (data.message.length == 0) { //if the dog has no sub breed

            alert('No sub breeds!');
            containsSubBreed = false;
            
        }else{
            console.log('Sub breeds present!!', data.message);
            containsSubBreed = true;

            //create a text input for sub breed and insert it after the breed input:

            $('<input>').attr({
                type: 'text',
                id: 'sub-breed-id',
                placeholder: 'Sub Breed'
            }).insertAfter('#breed-id');

        }

    });

}



function myFunction(event){

    event.preventDefault();
    // console.log(event);

    console.log('containssubbreed', containsSubBreed);

    if(containsSubBreed == false){
        let breed = dogBreed.val();
        let url2 = 'https://dog.ceo/api/breed/' + breed  + '/images';

        $.get(url2, function(data){
    
            let photos = data.message;
            console.log('photos', photos);
    
            let img;
            for(let photo of photos){
                //create a img tag -> append to div
                img = $(document.createElement('img'));
                img.attr('src', photo);
                dogImages.append(img);
            }
    
        })
    }else{
        event.preventDefault();
        
        let breed = dogBreed.val();
        console.log('breed', breed);

        var dogSubBreed = $('#sub-breed-id');
        console.log(dogSubBreed);
        let subBreed = dogSubBreed.val();
        console.log('subBreed:', subBreed);

        if (subBreed == "") {
            alert('Enter sub-breed!');
            return;
        }

        let url3 = 'https://dog.ceo/api/breed/' + breed + '/' + subBreed + '/images';

        $.get(url3, function(data){
            let photos = data.message;

            for(let photo of photos){
                //create a img tag -> append to div
                img = $(document.createElement('img'));
                img.attr('src', photo);
                dogImages.append(img);
            }

        });
        
       
    }

   
    

}

// function subBreedFunction(){

//     //create a text input for sub breed and insert it after the breed input:
//     $('<input>').attr({
//         type: 'text',
//         name: 'sub-breed-id',
//         placeholder: 'Sub Breed'
//     }).insertAfter('#breed-id');

    

// }

