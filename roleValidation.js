

export const isSiswa = async (req, res, next) => {
    const roleUser = req.user.role;
    if (roleUser == "Siswa") {
        next();
    } else {
        res.status(406).json({
            Success: false,
            Authorize: false,
            Information: "You don't have permission",
        });
    }
};
export const isKaryawan = async (req, res) => {
    const roleUser = req.user.role;
    if (roleUser == "Karyawan") {
        next();
    } else {
        res.status(406).json({
            Success: false,
            Authorize: false,
            Information: "You don't have permission",
        });
    }
};