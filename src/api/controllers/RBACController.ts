// Import the logRBACAction function at the top of the file
import { logRBACAction } from '../utils/auditLogger';

// Update the createRole function to include audit logging
export const createRole = async (req: Request, res: Response) => {
  const tenantId = (req as any).tenantId;
  const userId = (req as any).user.id;
  const { name, description, permissions } = req.body;

  try {
    // ... (existing code)

    // Log the action
    await logRBACAction(
      userId,
      'CREATE_ROLE',
      'ROLE',
      role.id,
      { name, description, permissions },
      tenantId
    );

    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    handleError(res, error);
  }
};

// Similarly, update other functions (updateRole, deleteRole, assignRoleToUser, removeRoleFromUser)
// to include audit logging using the logRBACAction function