import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { supabase } from '../server';

describe('RBAC System', () => {
  let testUserId: string;
  let testRoleId: string;
  let testPermissionId: string;
  const testTenantId = 'test-tenant-id';

  beforeAll(async () => {
    // Create a test user, role, and permission
    const { data: user } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123'
    });
    testUserId = user?.user?.id!;

    const { data: role } = await supabase
      .from('roles')
      .insert({ name: 'Test Role', tenant_id: testTenantId })
      .select()
      .single();
    testRoleId = role?.id;

    const { data: permission } = await supabase
      .from('permissions')
      .insert({ name: 'test_permission', resource: 'test', action: 'read' })
      .select()
      .single();
    testPermissionId = permission?.id;

    // Assign the permission to the role
    await supabase
      .from('role_permissions')
      .insert({ role_id: testRoleId, permission_id: testPermissionId });

    // Assign the role to the user
    await supabase
      .from('user_roles')
      .insert({ user_id: testUserId, role_id: testRoleId, tenant_id: testTenantId });
  });

  afterAll(async () => {
    // Clean up test data
    await supabase.from('user_roles').delete().eq('user_id', testUserId);
    await supabase.from('role_permissions').delete().eq('role_id', testRoleId);
    await supabase.from('roles').delete().eq('id', testRoleId);
    await supabase.from('permissions').delete().eq('id', testPermissionId);
    await supabase.auth.admin.deleteUser(testUserId);
  });

  it('should correctly assign and check user permissions', async () => {
    const { data: hasPermission, error } = await supabase.rpc('user_has_permission', {
      p_user_id: testUserId,
      p_tenant_id: testTenantId,
      p_permission_name: 'test_permission'
    });

    expect(error).toBeNull();
    expect(hasPermission).toBe(true);
  });

  it('should correctly retrieve user permissions', async () => {
    const { data: permissions, error } = await supabase.rpc('get_user_permissions', {
      p_user_id: testUserId,
      p_tenant_id: testTenantId
    });

    expect(error).toBeNull();
    expect(permissions).toHaveLength(1);
    expect(permissions![0]).toEqual({
      permission_name: 'test_permission',
      resource: 'test',
      action: 'read'
    });
  });
});