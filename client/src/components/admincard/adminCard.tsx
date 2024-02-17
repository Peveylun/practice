interface IUserInfo {
    name: string;
    surname: string;
}

const AdminCard = (userInfo: IUserInfo) => {
    return (
        <div
            className="m-0 p-0 container-fluid justify-content-center mt-3 w-100 d-flex flex-column align-items-center">
            <img width="100px" height="100px" className="rounded-5"
                 src="https://www.nj.com/resizer/mg42jsVYwvbHKUUFQzpw6gyKmBg=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/somerset_impact/photo/sm0212petjpg-7a377c1c93f64d37.jpg"
                 alt="avatar"/>
            <p className="m-0 text-light">{userInfo.name}</p>
            <p className="m-0 text-light">{userInfo.surname}</p>
        </div>
    )
}

export default AdminCard