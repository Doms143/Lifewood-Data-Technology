    <?php
/**
 * Lifewood Data Technology - Landing Page Server
 * This PHP file serves the built React application
 */

$base_path = dirname(__FILE__);
$dist_path = $base_path . '/dist';

// Handle routing - serve index.html for all non-file requests
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_uri = str_replace('/lifewood/', '', $request_uri); // Adjust if needed
$request_uri = ltrim($request_uri, '/');

// List of valid file extensions to serve directly
$file_extensions = ['js', 'css', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'woff', 'woff2', 'ttf', 'eot', 'map'];

$requested_file = $dist_path . '/' . $request_uri;

// Check if file exists and has a valid extension
if ($request_uri && file_exists($requested_file) && !is_dir($requested_file)) {
    $extension = strtolower(pathinfo($requested_file, PATHINFO_EXTENSION));
    if (in_array($extension, $file_extensions)) {
        // Serve the file directly
        // Set appropriate content type
        $mime_types = [
            'js' => 'application/javascript',
            'css' => 'text/css',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'eot' => 'application/vnd.ms-fontobject',
            'map' => 'application/json',
        ];

        $content_type = $mime_types[$extension] ?? 'application/octet-stream';
        header('Content-Type: ' . $content_type);
        
        // Enable caching for static assets
        header('Cache-Control: public, max-age=31536000');
        readfile($requested_file);
        exit;
    }
}

// Serve index.html for all other requests (SPA routing)
$index_file = $dist_path . '/index.html';

if (file_exists($index_file)) {
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    readfile($index_file);
} else {
    http_response_code(404);
    echo '<h1>404 - Not Found</h1>';
    echo '<p>The application files were not found. Please run <code>npm run build</code> first.</p>';
}
?>
