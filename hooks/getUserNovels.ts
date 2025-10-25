export async function getUserNovels() {
    const res = await fetch('api/user/novels',{
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