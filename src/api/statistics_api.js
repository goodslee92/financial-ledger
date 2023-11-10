export async function getTblInfo() {
    const res = await fetch("http://localhost:3001/api/moneyTblInfo", {
        method: 'get',
        headers: {
            'Content-type' : 'application/json',
        }
    });
    if (res.ok) {
        // 성공
        const data = res.json();
        console.log(data);
        return data;
    } else {
        // 실패
        console.error('실패');
    }
}