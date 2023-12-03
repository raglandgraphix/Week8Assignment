//Menu to add, show and delete bikes from inventory. Bikes will be kept in categoies by type i.e. Gravel bike, road bike, mountain bike.
class Bike{
    constructor(name,brand,quantity){
        this.name = name;
        this.brand = brand;
        this.quantity = quantity;

    }
    
}
// the bike typ class takes the values for the biketype
class BikeType{
    constructor(name){
        this.name = name;
        this.bike = [];
        
    }
    addBike(bike){
        if (this.bike instanceof Bike){
            this.bike.push(bike);
        }else{
            throw new Error(`Ivalid something ${bike}`);
        }
        
        
    }
   
}

class Menu{
    constructor(){
        this.bikeTypes = [];
        this.selectedBikeTypes=null;
    }
    start(){
        let selection = this.showMainMenuOptions();
       
        while(selection!=0){
            switch(selection){
                case '1' : this.createBikeType();
                break;
                case '2': this.veiwBikeType();
                break;
                case '3': this.deleteBikeType();
                break;
                case '4': this.displayAllBikeTypes();
                break;
                default: selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
       alert('See you on the trails');
    }
    showMainMenuOptions(){
        return prompt(`
            0) Exit
            1) Create Bike Type
            2) Veiw Bike Type
            3) Delete Bike Type
            4) Display All Bike Types
        `);

    }
    showBikeTypeMenuOptions(bikeTypeInfo){
        return prompt(
            `0) Back
            1) Create Bike
            2) Delete Bike
            3) Increase Bike Inventory
            4) Decrease Bike Quantity
            
            ----------------------------------
            ${bikeTypeInfo}
            `
        )
    }
    displayAllBikeTypes(){
        let bikeTypeString = '';
        for(let i=0;i<this.bikeTypes.length;i++){
            bikeTypeString += i + ')' + this.bikeTypes[i].name + '\n';
        }
        alert(bikeTypeString);
    }
    createBikeType(){
        let name = prompt(`Enter what type of bike you are creating`);
        this.bikeTypes.push(new BikeType(name));

    }
    veiwBikeType(){
        let index = prompt(`Enter the index of the Bike Type you wish to view`);
        if(index > -1 && index < this.bikeTypes.length){
            this.selectedBikeTypes=this.bikeTypes[index];
            let description = 'Bike Type: ' + this.selectedBikeTypes.name + '\n';
            
        for(let i=0; i<this.selectedBikeTypes.bike.length;i++){
            description += i + ')' + this.selectedBikeTypes.bike[i].name
            + '-' + this.selectedBikeTypes.bike[i].brand + ' - On Hand: '+ this.selectedBikeTypes.bike[i].quantity + '\n';

        }
       
        let selection = this.showBikeTypeMenuOptions(description);
        switch(selection){
            case '1': this.createBike();
            break;
            case '2': this.deleteBike();
            break;
            case '3': this.addBikeQuantity();
            break;
            case '4': this.decreaseBikeQuantity();

        }

        }
        

    }
    //this deletes teh bike type
    deleteBikeType(){
        let index = prompt(`What is the index of the bike type you would like to delete`);
        if(index > -1 && index < this.bikeTypes.length){
            this.bikeTypes.splice(index, 1);
        }
    }
    //this creates the actual bike within the bike type
    createBike(){
        let name = prompt(`What is the model name of the bike?`);
        let brand = prompt(`What is the brand of the bike`);
        let quantity = prompt(`How many of these bikes in Inventory`);
        this.selectedBikeTypes.bike.push(new Bike(name,brand,quantity));
    }
    //this  deletes teh bike with in the bike type
    deleteBike(){
       
        let index = prompt(`what is the index of the bike you would like to delete`);
        if(index > -1 && index < this.selectedBikeTypes.bike.length){
            this.selectedBikeTypes.bike.splice(index,1);
        }
    }

    //this adds more inventory
    addBikeQuantity(){
        
       let index = prompt('What is the index of the bike, to which you wish to add to the inventory?');
       //prompts return strings. All numbers will be turned into strings. therefor I have to convert strings to numbers using the ES6 Number method.
       let convertedQuantity = Number(this.selectedBikeTypes.bike[index].quantity);
       
       let quantityAdd = Number(prompt('How many of this bike do you want to add to the inventory'));
       if(index>-1 && index<this.selectedBikeTypes.bike.length){
            
            this.selectedBikeTypes.bike[index].quantity = convertedQuantity + quantityAdd;
         }
        
    }
    // this decreases inventory from the inventory
    decreaseBikeQuantity(){
        let index = prompt('What is the index of the bike, to which you wish to remove the inventory?');
        //prompts return strings. All numbers will be turned into strings. therefor I have to convert strings to numbers using the ES6 Number method.
        let convertedQuantity = Number(this.selectedBikeTypes.bike[index].quantity);
        let quantitySub = Number(prompt('How many of this bike do you want to remove from the inventory'));
        if(index>-1 && index<this.selectedBikeTypes.bike.length){
             
             this.selectedBikeTypes.bike[index].quantity = convertedQuantity - quantitySub;
          }
    }
    
}
let menu = new Menu();
menu.start();