package com.ontimize.songslists.model.core.dao;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;


@Lazy
@Repository(value = "UserPreferenceDao")
@ConfigurationFile(
	configurationFile = "dao/UserPreferenceDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")

public class UserPreferenceDao extends OntimizeJdbcDaoSupport{
	
	public static final String ID_PREFERENCE    = "id_user_preference";
	public static final String NAME_PREFERENCE  = "preference_name";
	public static final String USER_LOGIN 		= "user_login";
	public static final String PREFERENCE 		= "preference_value";

}
