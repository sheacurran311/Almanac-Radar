// Add these new routes to the existing rbacRoutes.ts file

router.post('/roles/set-parent', authenticateJWT, checkPermission('manage_roles'), setRoleParent);
router.get('/roles/hierarchy', authenticateJWT, checkPermission('view_roles'), getRoleHierarchy);