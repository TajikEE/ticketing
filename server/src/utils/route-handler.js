export function route(callback) {
  return async (req, res, next) => {
    try {
      const result = await callback(req, res);
      if (typeof result !== "undefined") {
        res.json(result);
      }
    } catch (ex) {
      console.error("Error: ", ex);
      next(ex);
    }
  };
}
