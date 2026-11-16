const message =document.querySelector("#message");

export async function  showloading(){
message.innerHTML=`<div class="flex items-center justify-center gap-3 py-4 text-gray-300">
            <div class="w-8 h-8 border-4 border-gray-600 border-t-red-500 rounded-full animate-spin"></div>
            <span class="text-sm font-semibold">Chargement des chaînes...</span>
        </div>`;

}    
export function hideloding(){
    message.innerHTML='';
}
