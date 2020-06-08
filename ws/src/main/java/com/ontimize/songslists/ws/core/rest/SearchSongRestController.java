package com.ontimize.songslists.ws.core.rest;


@RestController
@RequestMapping("/songs")
@ComponentScan(basePackageClasses = { com.ontimize.songslists.api.core.service.ISongService.class })
public class SearchSongRestController extends ORestController<ISongService> {

 @Autowired
 private ISongService songService;

 @Override
 public ISongService getService() {
  return this.songService;
 }
 @RequestMapping(value = "/songs/searchSong", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
 public EntityResult currentOffersSearch(@RequestBody Map<String, Object> req) {
  try {
   List<String> columns = (List<String>) req.get("columns");
    Map<String, Object> filter = (Map<String, Object>) req.get("filter");
   String nameToSearch = (String) filter.get("NAME");
    String option = (String) filter.get("OPTION");
   Map<String, Object> key = new HashMap<String, Object>();
   key.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY,
     searchLike(nameToSearch,option));
   return offerService.offerQuery(key, columns);
  } catch (Exception e) {
   e.printStackTrace();
   EntityResult res = new EntityResult();
   res.setCode(EntityResult.OPERATION_WRONG);
   return res;
  }
 }

 private BasicExpression searchLike(String param, String toSearch,String option) {
switch(option) {
  case "song":
  param = SongDao.NAME_SONG;
    // code block
    break;
  case "album":
   param = SongDao.NAME_ALBUM;
    // code block
    break;
    case "artist":
     param = SongDao.NAME_ARTIST;
      // code block
    break;
  default:
    // code block
}
  BasicField field = new BasicField(param);
  BasicExpression bexp1 = new BasicExpression(field, BasicOperator.LIKE, toSearch);
  return new BasicExpression(bexp1);
 }
