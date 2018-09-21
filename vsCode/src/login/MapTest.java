package login;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapTest {
	public List<Map<String, Object>> returnMap() {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String, Object>> list = new ArrayList<>();
		map.put("user_id", "korea");
		map.put("user_name", "kName");
		map.put("user_pw", "12345");
		list.add(map);
		map = new HashMap<String, Object>();
		map.put("user_id", "japan");
		map.put("user_name", "jName");
		map.put("user_pw", "23456");
		list.add(map);

		for (Map<String, Object> m : list) {
			System.out.println(m.get("user_id") + ", " + m.get("user_name") + ", " + m.get("user_pw"));
		}
		return list;

	}
}
