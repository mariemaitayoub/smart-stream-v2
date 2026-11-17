export async function channels() {
    try {
        
        const resp = await fetch(`https://api.npoint.io/5baf2e4511d5036d3a7a`)
        const response = await resp.json()
        console.log(response);
        return response;
     }
    catch (error) {
        console.log(error);
    }
 
    
}