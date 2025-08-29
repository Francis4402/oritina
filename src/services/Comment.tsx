

const baseurl = process.env.BASE_URL;

export const getComments = async () => {
    try {
        const res = await fetch(`${baseurl}/comment`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
            next: {
                tags: ['comments']
            }
        });

        return res.json();
    } catch (error) {
        console.log(error);
    }
}