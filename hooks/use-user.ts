export async function getUser() {
    const res = await fetch('api/user',{
        method: "GET",
        cache: "no-store"
    });
    if(res.ok){
        const result = await res.json();
        return result;
    } else {
        return null;
    }
}