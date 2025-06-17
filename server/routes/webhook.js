const axios = require('axios');
const router = require('express').Router();

router.post('/', async (req, res) => {
  console.log("🔔 Webhook Received:", JSON.stringify(req.body, null, 2));

  const projectId = req.body.project_id;
  const commitSha = req.body.after;

  try {
    const diffRes = await axios.get(
      `https://gitlab.com/api/v4/projects/${projectId}/repository/commits/${commitSha}/diff`,
      {
        headers: {
          'Private-Token':process.env.GITLAB_TOKEN
        }
      }
    );
    console.log("📄 File Changes:\n", diffRes.data);
  } catch (err) {
    console.error("❌ Failed to fetch diff:", err.message);
  }

  res.status(200).json({ message: 'Webhook processed with diff' });
});

module.exports = router;
