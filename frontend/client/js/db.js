const url = "http://localhost:3000";

const packageTemplate = (id,name,price,des,imgurl) => `<div class="box package">
<img src="${url}/photos/${imgurl}" alt="">
<div class="content">
    <h3> <i class="fas fa-map-marker-alt"></i> ${name} </h3>
    <p>${des}</p>
    <div class="price"> Rs.${price} </div>
    <span class="btn book-btn" data-pkgid=${id} data-name=${name} data-price=${price}>book now</span>
</div>
</div>`;

async function updatePackage(){
    const link=`${url}/package`;
    const data=await fetch(link,{
        method:"GET"
    });
    let res=await data.json();
    console.log(res);
    document.querySelector(".box-container").innerHTML="";
    res.forEach(d => {
        document.querySelector(".box-container").innerHTML+=packageTemplate(d.id,d.place,d.price,d.description,d.image);
    });
}

updatePackage();