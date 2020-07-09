package com.ontimize.songslists.model.core.dao;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;


@Repository(value = "UserRoleDao")
@Lazy
@ConfigurationFile(
	configurationFile = "dao/UserRoleDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")
public class UserRoleDao extends OntimizeJdbcDaoSupport {
	
	
	public static final String ID_USERROLE      = "id_user_role";
	public static final String ID_ROLENAME      = "id_rolename";
	public static final String ID_USER  		= "id_user";
	public static final String NICK 			= "nick_user";
	public static final String ROLENAME 		= "rolename";
}