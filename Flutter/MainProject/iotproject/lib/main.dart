import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: DevicesPage(),
    );
  }
}

class DevicesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Your Devices',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
body: Column(
  children: [
    // Search bar, Filter, and Grid buttons
    Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Column(
        children: [
          TextField(
            decoration: InputDecoration(
              prefixIcon: Icon(Icons.search, color: Colors.orange),
              hintText: 'Search ... 2 Devices',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(25.0),
              ),
            ),
          ),
          const SizedBox(height: 8),
                Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          GestureDetector(
            onTap: () {},
            child: Row(
              children: [
                Icon(Icons.filter_alt, color: Colors.orange),
                Text('Filter', style: TextStyle(color: Colors.orange)),
              ],
            ),
          ),
          GestureDetector(
            onTap: () {
              print("Grid view button tapped");
            },
            child: Row(
              children: [
                Icon(Icons.grid_view, color: Colors.orange),
                Text('Grid View', style: TextStyle(color: Colors.orange)),
              ],
            ),
          ),
        ],
      ),
        ],
      ),
    ),
          
          

          // List of devices
          Expanded(
            child: ListView(
              children: [

                InkWell(
                onTap: () {
                  print('Device tapped');
                },

                child: DeviceCard(
                  imagePath: 'assests/TestImages/TestGpsImage.png',
                  title: 'Tracker One',
                  lastMaintenance: '300 days ago',
                  gpsLocation: '40.748195, -73.989308',
                  status: 'Needs New Battery',
                  statusColor: Colors.red,

                  ),
                ),
                InkWell(
                onTap: () {
                  print('Device tapped');
                },
                
                child: DeviceCard(
                  imagePath: 'assests/TestImages/TestGpsImage.png',
                  title: 'Computer One',
                  lastMaintenance: '200 days ago',
                  gpsLocation: '40.748195, -73.989308',
                  status: '',
                  statusColor: Colors.transparent,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),

      // Bottom Navigation Bar
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: const Color.fromARGB(255, 13, 42, 56),
        unselectedItemColor: Colors.white,
        selectedItemColor: Colors.white,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.add_circle, size: 40),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }
}

class DeviceCard extends StatelessWidget {
  final String imagePath;
  final String title;
  final String lastMaintenance;
  final String gpsLocation;
  final String status;
  final Color statusColor;


  DeviceCard({
    required this.imagePath,
    required this.title,
    required this.lastMaintenance,
    required this.gpsLocation,
    required this.status,
    required this.statusColor,

  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        elevation: 4,
        child: Row(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Image.asset(
                imagePath,
                width: 60,
                height: 60,
                fit: BoxFit.cover,
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text('Last Maintenance: $lastMaintenance'),
                    Text('GPS LOCATION: $gpsLocation'),
                    if (status.isNotEmpty)
                      Text(
                        status,
                        style: TextStyle(
                          color: statusColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
