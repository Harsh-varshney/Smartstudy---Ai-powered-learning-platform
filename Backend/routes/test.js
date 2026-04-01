router.get("/admin-test", authMiddleware, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin 🎉" });
});