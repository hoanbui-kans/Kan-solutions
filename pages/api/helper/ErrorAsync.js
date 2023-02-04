export const ErrorAsync = {
    onError: (err, req, res, next) => {
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        const { method } = req
        res.setHeader('Allow', ['POST','PUT', 'GET', 'DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    },
}